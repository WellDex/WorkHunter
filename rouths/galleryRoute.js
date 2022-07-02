const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auhtMiddleware');
const Gallery = require('../modules/Gallery');
const chalk = require('chalk');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    if (req.files) {
      const {img} = req.files;
      const {id} = req.body;
      let galleryData = [];

      if (Array.isArray(img)) {
        for (let file of img) {
          const fileName = uuid.v4() + '.jpg';
          file.mv(path.resolve(__dirname, '..', 'static', 'gallery', fileName));
          galleryData.push({
            img: fileName,
            createDate: new Date(),
            owner: id,
          });
        }
      } else {
        const fileName = uuid.v4() + '.jpg';
        img.mv(path.resolve(__dirname, '..', 'static', 'gallery', fileName));
        galleryData.push({
          img: fileName,
          createDate: new Date(),
          owner: id,
        });
      }

      if (galleryData.length > 0) {
        await Gallery.create(galleryData);
      }
    }

    res.status(201).json({message: 'Фотографии добавлены'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const {top} = req.query;
    const id = req.params.id;
    let count;
    let gallery;

    if (Object.keys(req.query).length > 0) {
      gallery = await Gallery.find({owner: id})
        .sort({createDate: 'desc'})
        .limit(+top);
    } else {
      gallery = await Gallery.find({owner: id});
    }

    if (Object.keys(req.query).includes('count')) {
      count = await Gallery.find({owner: id}).count();
    }

    res.json(
      count
        ? {
            gallery: gallery.sort((a, b) => {
              const date1 = new Date(a.createDate);
              const date2 = new Date(b.createDate);

              return date2 - date1;
            }),
            count,
          }
        : gallery.sort((a, b) => {
            const date1 = new Date(a.createDate);
            const date2 = new Date(b.createDate);

            return date2 - date1;
          })
    );
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

router.delete(
  '/delete/:id',
  [check('id', 'Отсутствует id').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные фотографии',
        });
      }
      const {id} = req.params;

      const gallery = await Gallery.findById(id);
      fs.unlinkSync(`static/gallery/${gallery.img}`);

      await gallery.delete();

      res.status(201).json({message: 'Фотография удалена'});
    } catch (error) {
      console.log(chalk.white.bgRed.bold(error));
      res.status(500).json({message: `Server error: ${error}`});
    }
  }
);

router.delete('/deleteAll', auth, async (req, res) => {
  try {
    await Note.deleteMany(Note.find({owner: req.user.userId}));

    res.status(201).json({message: 'Записи удалены'});
  } catch (error) {
    console.log(chalk.white.bgRed.bold(error));
    res.status(500).json({message: `Server error: ${error}`});
  }
});

module.exports = router;
