import { FormProvider, UseFormReturn } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: Object;
};

export function RHFFormProvider({ children, onSubmit, methods, style }: Props) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ marginBlockEnd: 0, ...style }}>
        {children}
      </form>
    </FormProvider>
  );
}
