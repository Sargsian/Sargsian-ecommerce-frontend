import { client, Field, Query } from '@tilework/opus';
import { Product } from '../../models/types';
import { AppDispatch } from '../store';
import {
  fetchingProduct,
  fetchingProductSuccess,
  fetchingProductError,
} from './productSlice';

const productFields = [
  'id',
  'name',
  'inStock',
  'gallery',
  'description',
  'category',
  'brand',
] as const;

const currencyFields = ['label', 'symbol'];
const attributeSetFields = ['id', 'name', 'type'];
const attributeFields = ['displayValue', 'value', 'id'];

export const fetchProduct = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchingProduct());
    const query = new Query('product')
      .addArgument('id', 'String!', id)
      .addFieldList(productFields)
      .addField(
        new Field('prices', true)
          .addField('amount')
          .addField(new Field('currency', true).addFieldList(currencyFields))
      )
      .addField(
        new Field('attributes', true)
          .addFieldList(attributeSetFields)
          .addField(new Field('items', true).addFieldList(attributeFields))
      );

    const result = await client.post(query);
    const product = result.product as unknown as Product;
    dispatch(fetchingProductSuccess(product));
  } catch (error) {
    dispatch(fetchingProductError());
  }
};
