import { FormControl, FormLabel, Textarea, Text } from '@chakra-ui/react';
import { forwardRef } from 'react';

const TextArea = forwardRef(({ label, error, ...props }, ref) => {
    return (
        <FormControl mb={5}>
            <FormLabel>{label}</FormLabel>
            <Textarea {...props} isInvalid={error} ref={ref} mb={2} />
            {error && <Text color='red.300'>{error}</Text>}
        </FormControl>
    );
});

export default TextArea;
