import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  const fileName = `${Math.random()}-${newCabin.image.name}`;

  const filePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${fileName}`;
  // https://qwlcbpasxcaigunyvgkf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: filePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(fileName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and cabin could not be created'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}