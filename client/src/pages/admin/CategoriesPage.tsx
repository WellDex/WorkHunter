import {
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import FrameHoc from '../../hoc/FrameHoc';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalCategoryForm from '../../components/admin/ModalCategoryForm';
import * as categoriesSelectors from '../../Redux/categories/categoriesSelectors';
import {connect} from 'react-redux';
import {getCategories} from '../../Redux/categories/categoriesOperations';
import {ICategory} from '../../Redux/categories/categoriesReducer';
import {categoriesAPI} from '../../api/categoriesAPI';

interface ICategories {
  categories: ICategory[];
  getCategories: () => void;
}

interface ICustomTableRow {
  category: ICategory;
  openModal: () => void;
  setCurrentCategory: (c: ICategory) => void;
  setParentId: (id: string) => void;
  getCategories: () => void;
}

const CustomTableRow = ({
  category,
  openModal,
  setCurrentCategory,
  setParentId,
  getCategories,
}: ICustomTableRow) => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteCategory = async (id: string) => {
    await categoriesAPI.delete(id).then(() => getCategories());
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {category.childrens.length > 0 && (
            <IconButton size="small" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell align="left">{category.title}</TableCell>
        <TableCell align="right">
          <Button
            onClick={() => {
              setParentId(category._id);
              openModal();
            }}>
            <AddIcon />
          </Button>
          <Button
            onClick={() => {
              setCurrentCategory(category);
              openModal();
            }}>
            <EditIcon />
          </Button>
          <Button onClick={() => deleteCategory(category._id)}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={3} style={{padding: 0}}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{padding: 0}} />
                  <TableCell style={{padding: 0}} />
                  <TableCell style={{padding: 0}} />
                </TableRow>
              </TableHead>
              <TableBody>
                {category.children &&
                  category.children.length > 0 &&
                  category.children.map((child, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{width: 50}} />
                      <TableCell align="left">{child.title}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() => {
                            setParentId(category._id);
                            setCurrentCategory(child);
                            openModal();
                          }}>
                          <EditIcon />
                        </Button>
                        <Button onClick={() => deleteCategory(child._id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const CategoriesContainer = ({categories, getCategories}: ICategories) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(
    null
  );
  const [parentId, setParentId] = useState<string | null>(null);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{width: 30}} />
            <TableCell>Название</TableCell>
            <TableCell align="right">
              <span style={{marginRight: '1rem'}}>Дейстрия</span>
              <Button onClick={() => setIsOpen(true)}>
                <AddIcon />
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <CustomTableRow
                key={index}
                category={category}
                setParentId={setParentId}
                openModal={() => setIsOpen(true)}
                getCategories={getCategories}
                setCurrentCategory={setCurrentCategory}
              />
            ))}
        </TableBody>
      </Table>
      {isOpen && (
        <ModalCategoryForm
          parent={parentId}
          category={currentCategory}
          handleClose={() => {
            setParentId(null);
            setCurrentCategory(null);
            setIsOpen(false);
          }}
          open={isOpen}
          getCategories={getCategories}
        />
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  categories: categoriesSelectors.getCategories(state),
});

const mapDispatchToProps = {
  getCategories,
};

const CategoriesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesContainer);

export default FrameHoc(CategoriesPage);