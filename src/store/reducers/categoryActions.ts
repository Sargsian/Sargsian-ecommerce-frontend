import { client, Field, Query } from '@tilework/opus';
import { Category } from '../../models/types';
import { AppDispatch } from '../store';
import {
  fetchingCategory,
  fetchingCategoryError,
  fetchingCategorySuccess,
} from './categorySlice';

const productFields = [
  'name',
  'id',
  'inStock',
  'gallery',
  'description',
  'category',
  'brand',
] as const;

const currencyFields = ['label', 'symbol'];
const attributeSetFields = ['id', 'name', 'type'];
const attributeFields = ['displayValue', 'value', 'id'];

export const fetchCategory =
  (productCategory: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchingCategory());
      const query = new Query('category')
        .addArgument('input', 'CategoryInput', { title: productCategory })
        .addField('name')
        .addField(
          new Field('products', true)
            .addFieldList(productFields)
            .addField(
              new Field('prices', true)
                .addField('amount')
                .addField(
                  new Field('currency', true).addFieldList(currencyFields)
                )
            )
            .addField(
              new Field('attributes', true)
                .addFieldList(attributeSetFields)
                .addField(
                  new Field('items', true).addFieldList(attributeFields)
                )
            )
        );

      const result = await client.post(query);
      const category = result.category as unknown as Category;
      dispatch(fetchingCategorySuccess(category));
    } catch (error) {
      dispatch(fetchingCategoryError());
    }
  };
