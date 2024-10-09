'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { menuOptions } from '@/lib/constant';
import clsx from 'clsx';
import { Separator } from '@/components/ui/separator';
import Signout from '../icons/signout';
import { ModeToggle } from '../../../../../components/unused/mode-toggle';

type Props = {};

const MenuOptions = (props: Props) => {
  const pathName = usePathname();

  return (
    <nav className="dark:bg-black h-screen flex flex-col sticky justify-between py-6 px-2">
      {/* Main menu in the center */}
      <div className="flex flex-col z-1000 items-center justify-center flex-grow gap-8">
        <TooltipProvider>
          {menuOptions.map((menuItem) => (
            <ul key={menuItem.name}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <li>
                    <Link
                      href={menuItem.href}
                      className={clsx(
                        'group h-8 w-8 ml-3 mr-3 flex items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer',
                        {
                          'dark:bg-[#e2e2e2] bg-[#ffffff]':
                            pathName === menuItem.href,
                        }
                      )}
                    >
                      <menuItem.Component
                        selected={pathName === menuItem.href}
                      />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.name}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
      </div>
      {/* Separator and bottom items */}
      <div className="flex flex-col items-center gap-8">
        {/* <Separator /> */}
        <TooltipProvider>
          {/* <ModeToggle /> */}
          {/* <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Link
                className="flex font-bold h-8 w-8 ml-3 mr-3 items-center justify-center scale-[1.5] rounded-lg p-[3px] cursor-pointer"
                href="/"
              >
                <Signout selected={false} />
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-black/10 backdrop-blur-xl"
            >
              <p>Sign out</p>
            </TooltipContent>
          </Tooltip> */}
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default MenuOptions;
