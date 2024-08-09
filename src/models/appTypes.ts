import {
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

import { LucideProps } from 'lucide-react';

export type TIconTypes = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
