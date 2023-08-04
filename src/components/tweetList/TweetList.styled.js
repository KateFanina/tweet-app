import styled from 'styled-components';
import { FormControl, TablePagination } from '@mui/material';

const Placeholder = styled.ul`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 30px;
`;

const FormControlFilter = styled(FormControl)`
  justify-content: center;
  width: 125px;
`;

const Pagination = styled(TablePagination)`
  display: flex;
  justify-content: center;
`;


export { Placeholder, FormControlFilter, Pagination };
