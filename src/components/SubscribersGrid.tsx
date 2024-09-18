import React, { useState } from 'react'
import { DataGridPro, GridDataSource } from '@mui/x-data-grid-pro'
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { SearchModel } from '../types';
const SubscribersGrid = () => {
    const [error, setError] = useState<string | null>(null);

    const columns = [
        { field: 'email', headerName: 'Email', width: 300, sorting: true, filterable: true }, 
        { field: 'expirationDate', headerName: 'ExpirationDate', width: 300, sorting: true, filterable: false }
      ]

    const dataSource: GridDataSource = React.useMemo(
      () => ({
        getRows: async (params) => {

          const udrlParams: SearchModel = { 
            email: params.filterModel?.items?.find((item) => item.field === "email")?.value, 
            page: params.paginationModel.page, 
            pageSize: params.paginationModel.pageSize,
            orderBy: params.sortModel?.[0]?.field,
            direction: params.sortModel?.[0]?.sort
          };
          
          const response = await axios.get('https://localhost:7236/v1/subscribers', {
            params: { ...udrlParams },
          })
          .then((response) => {
            setError(null)
            return response.data
           })
          .catch((error) => {
            setError('Failed to fetch data.');
            console.error('Error fetching data:', error);
          });
       
          return {
            rows: response.data,
            rowCount: response.totalCount
          };
        },
      }), []
    );

  return (
  <div style={{ height: 900, width: 625 }}>
    <DataGridPro 
       columns={columns}
       disableColumnFilter
       headerFilters
       slots={{
         headerFilterMenu: null,
       }}
       unstable_dataSource={dataSource}
       pagination
    />
    {error && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
        >
          <Alert onClose={() => setError(null)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
  </div>
  )
}

export default SubscribersGrid;