"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './dialog';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className={`border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] w-[90vw] h-[90vh] !max-w-none max-h-[90vh] overflow-y-auto ${className}`}>
        <div>
          {title && (
            <DialogHeader className="mb-6 flex flex-col items-start gap-4">
              <DialogTitle className="text-3xl font-black uppercase tracking-tight bg-primary text-primary-foreground px-4 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1 hover:rotate-0 transition-transform duration-300">
                {title}
              </DialogTitle>
              <DialogClose className="bg-destructive text-destructive-foreground h-10 w-10 flex items-center justify-center border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 -rotate-3 hover:rotate-0">
                <X className="h-5 w-5" />
              </DialogClose>
            </DialogHeader>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
