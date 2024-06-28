interface IProps {
  text: string;
}

export function Text({ text }: IProps) {
  return <h2 className="text-3xl dark:text-white">{text}</h2>;
}
