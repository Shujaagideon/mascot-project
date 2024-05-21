import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebase';
import { v4 as uuid } from 'uuid';

async function upload(file) {
  const storeRef = ref(storage, `images/${uuid()}`);
  const uploadTask = await uploadBytesResumable(storeRef, file);

  return getDownloadURL(uploadTask.ref);
}

async function uploadMultiple(files) {
  return Promise.all(files.map(file => upload(file)));
}

async function deleteFile(url) {
  const fileRef = ref(storage, url);

  return deleteObject(fileRef);
}

export { upload, uploadMultiple, deleteFile };
