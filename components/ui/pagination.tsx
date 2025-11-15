// import * as React from 'react'
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   MoreHorizontalIcon,
// } from 'lucide-react'

// import { cn } from '@/lib/utils'
// import { Button, buttonVariants } from '@/components/ui/button'

// function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
//   return (
//     <nav
//       role="navigation"
//       aria-label="pagination"
//       data-slot="pagination"
//       className={cn('mx-auto flex w-full justify-center', className)}
//       {...props}
//     />
//   )
// }

// function PaginationContent({
//   className,
//   ...props
// }: React.ComponentProps<'ul'>) {
//   return (
//     <ul
//       data-slot="pagination-content"
//       className={cn('flex flex-row items-center gap-1', className)}
//       {...props}
//     />
//   )
// }

// function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
//   return <li data-slot="pagination-item" {...props} />
// }

// type PaginationLinkProps = {
//   isActive?: boolean
// } & Pick<React.ComponentProps<typeof Button>, 'size'> &
//   React.ComponentProps<'a'>

// function PaginationLink({
//   className,
//   isActive,
//   size = 'icon',
//   ...props
// }: PaginationLinkProps) {
//   return (
//     <a
//       aria-current={isActive ? 'page' : undefined}
//       data-slot="pagination-link"
//       data-active={isActive}
//       className={cn(
//         buttonVariants({
//           variant: isActive ? 'outline' : 'ghost',
//           size,
//         }),
//         className,
//       )}
//       {...props}
//     />
//   )
// }

// function PaginationPrevious({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to previous page"
//       size="default"
//       className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
//       {...props}
//     >
//       <ChevronLeftIcon />
//       <span className="hidden sm:block">Previous</span>
//     </PaginationLink>
//   )
// }

// function PaginationNext({
//   className,
//   ...props
// }: React.ComponentProps<typeof PaginationLink>) {
//   return (
//     <PaginationLink
//       aria-label="Go to next page"
//       size="default"
//       className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
//       {...props}
//     >
//       <span className="hidden sm:block">Next</span>
//       <ChevronRightIcon />
//     </PaginationLink>
//   )
// }

// function PaginationEllipsis({
//   className,
//   ...props
// }: React.ComponentProps<'span'>) {
//   return (
//     <span
//       aria-hidden
//       data-slot="pagination-ellipsis"
//       className={cn('flex size-9 items-center justify-center', className)}
//       {...props}
//     >
//       <MoreHorizontalIcon className="size-4" />
//       <span className="sr-only">More pages</span>
//     </span>
//   )
// }

// export {
//   Pagination,
//   PaginationContent,
//   PaginationLink,
//   PaginationItem,
//   PaginationPrevious,
//   PaginationNext,
//   PaginationEllipsis,
// }


"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5)

  return (
    <div className="flex items-center justify-between mt-4 mx-4">
      <span className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            "px-3 py-1 rounded border cursor-pointer border-slate-200 hover:bg-slate-50 text-sm transition-colors",
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          Previous
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-1 rounded text-sm border border-slate-200 transition-colors cursor-pointer",
              currentPage === page
                ? "bg-slate-900 text-white border-slate-900"
                : "hover:bg-slate-50"
            )}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            "px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-sm transition-colors",
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          Next
        </button>
      </div>
    </div>
  )
}
