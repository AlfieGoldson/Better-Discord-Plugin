export const formatString = (input: string, values: Record<string, string>) =>
    Object.entries(values).reduce(
        (output, [key, val]) => output.replace(new RegExp(`//${key}//`, 'g'), val),
        input ?? '',
    );
