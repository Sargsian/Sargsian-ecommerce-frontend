import { client, Query } from '@tilework/opus';
import { Category } from '../../models/types';
import { AppDispatch } from '../store';
import {
  fetchingCategories,
  fetchingCategoriesSuccess,
  fetchingCategoriesError,
} from './categoriesSlice';

export const fetchCategories = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchingCategories());
    const query = new Query('categories').addField('name');
    const result = await client.post(query);
    const categories = result.categories as unknown as Category[];
    dispatch(fetchingCategoriesSuccess(categories));
  } catch (error) {
    dispatch(fetchingCategoriesError());
  }
};
