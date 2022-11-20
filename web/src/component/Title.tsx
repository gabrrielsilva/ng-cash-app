type TitleProps = {
  text: string
};

export const Title = ({ text }: TitleProps) => {
  return <h1 className='text-3xl font-semibold text-gray-200 '>{text}</h1>;
};
