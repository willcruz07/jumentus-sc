enum ESizes {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
}

interface IProps {
  size: keyof typeof ESizes;
  direction: 'X' | 'Y';
}

export function Spacing({ size, direction }: IProps) {
  const formatDirection: Record<'X' | 'Y', string> = {
    X: 'w',
    Y: 'h',
  };

  const formatSpacing: Record<'X' | 'Y', string> = {
    X: 'h',
    Y: 'w',
  };

  const className: Record<keyof typeof ESizes, string> = {
    XS: `${formatDirection[direction]}-full ${formatSpacing[direction]}-1`,
    SM: `${formatDirection[direction]}-full ${formatSpacing[direction]}-2`,
    MD: `${formatDirection[direction]}-full ${formatSpacing[direction]}-4`,
    LG: `${formatDirection[direction]}-full ${formatSpacing[direction]}-6`,
  };

  return <div className={className[size]} />;
}
