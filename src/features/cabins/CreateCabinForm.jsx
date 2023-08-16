import { useForm } from 'react-hook-form';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEdit = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEdit ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isLoading = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    isEdit
      ? editCabin(
          { newCabinData: { ...data, image }, id: editId },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        )
      : createCabin(
          { ...data, image: image },
          {
            onSuccess: () => {
              reset();
              onCloseModal?.();
            },
          }
        );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          disabled={isLoading}
          id='name'
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          disabled={isLoading}
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isLoading}
          type='number'
          id='description'
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isLoading}
          {...register('image', {
            required: isEdit ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEdit ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
