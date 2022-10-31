import { client, Query } from '@tilework/opus';
import { Currency } from '../../models/types';
import { AppDispatch } from '../store';
import {
  fetchingCurrency,
  fetchingCurrencySuccess,
  fetchingCurrencyError,
} from './currencySlice';

export const fetchCurrency = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchingCurrency());
    const query = new Query('currencies', true).addFieldList([
      'label',
      'symbol',
    ]);
    const result = await client.post(query);
    const currencies = result.currencies as unknown as Currency[];
    dispatch(fetchingCurrencySuccess(currencies));
  } catch (error) {
    dispatch(fetchingCurrencyError());
  }
};
