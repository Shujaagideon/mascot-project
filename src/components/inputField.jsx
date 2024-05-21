import { FormControl, Text, FormLabel, Input } from '@chakra-ui/react';
import { forwardRef } from 'react';

const InputField = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <FormControl mb={5}>
      <FormLabel>{label}</FormLabel>
      <Input {...props} isInvalid={error} ref={ref} mb={2} />
      {error && <Text color='red.300'>{error}</Text>}
    </FormControl>
  );
});

export default InputField;
