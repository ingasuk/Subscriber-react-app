import React, { ChangeEvent, useState } from 'react';
import { Button, Stack, CircularProgress, Snackbar, Alert } from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import axios from 'axios';

const ImportFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid CSV file.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('formFile', file);

    try {

      await axios.post('https://localhost:7236/v1/subscribers/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFile(null);
      setSuccess('File uploaded successfully.');
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload the file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={1}>
      <input
        type="file"
        accept=".csv"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<UploadFile />}
        >
          Choose CSV File
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFileUpload}
        disabled={uploading || !file}
      >
        {uploading ? <CircularProgress size={24} color="inherit" /> : 'Upload File'}
      </Button>
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
      {success && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={Boolean(success)}
          autoHideDuration={6000}
          onClose={() => setSuccess(null)}
        >
          <Alert onClose={() => setSuccess(null)} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
    </Stack>
  );
};

export default ImportFile;