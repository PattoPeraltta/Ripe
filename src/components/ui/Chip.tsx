import { tv } from "tailwind-variants";

import { createComponent } from ".";

const chip = tv({
  base: "border-2 border-gray-700 rounded-full min-w-[42px] px-2 md:px-3 py-2 cursor-pointer inline-flex justify-center items-center whitespace-nowrap text-[#222133] hover:text-neutral-100",
  variants: {},
});

export const Chip = createComponent("button", chip);
