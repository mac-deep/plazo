import Button, { ButtonProps } from './Button';

type MultiPurposeBtnProps = {
  name: string;
  isSuccess: boolean;
  isLoading: boolean;
  successMessage: string;
} & ButtonProps;

export default function MultiPurposeBtn(props: MultiPurposeBtnProps) {
  const { isLoading, isSuccess, name, successMessage, ...rest } = props;
  let content;

  if (isLoading) content = 'Loading...';
  else if (isSuccess) content = successMessage;
  else content = name;

  return <Button {...rest}>{content}</Button>;
}
