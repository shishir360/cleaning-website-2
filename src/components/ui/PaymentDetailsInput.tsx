"use client";

import { Input } from "./input";
import { CreditCard } from "lucide-react";
import { useId, useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images, { type CardImages } from "react-payment-inputs/images";

interface PaymentDetailsInputProps {
  onValidChange?: (isValid: boolean, data: { number: string, expiry: string, cvc: string }) => void;
}

function PaymentDetailsInput({ onValidChange }: PaymentDetailsInputProps) {
  const id = useId();
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } =
    usePaymentInputs();

  // Handle changes and validate
  const handlePropChange = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = cardNumber;
    let newExpiry = expiry;
    let newCvc = cvc;
    
    if (name === 'number') {
      newNumber = e.target.value;
      setCardNumber(newNumber);
    }
    if (name === 'expiry') {
        newExpiry = e.target.value;
        setExpiry(newExpiry);
    }
    if (name === 'cvc') {
        newCvc = e.target.value;
        setCvc(newCvc);
    }

    if (onValidChange) {
      // Basic validation format (react-payment-inputs handles formatting, we just check completion length broadly)
      // Usually meta.error contains current validation errors from react-payment-inputs
      const isValid = !meta.error && newNumber.length > 14 && newExpiry.length >= 5 && newCvc.length >= 3;
      onValidChange(isValid, { number: newNumber, expiry: newExpiry, cvc: newCvc });
    }
  };

  const numberProps = getCardNumberProps({
    onChange: (e) => handlePropChange('number', e as React.ChangeEvent<HTMLInputElement>)
  });
  
  const expiryProps = getExpiryDateProps({
    onChange: (e) => handlePropChange('expiry', e as React.ChangeEvent<HTMLInputElement>)
  });
  
  const cvcProps = getCVCProps({
    onChange: (e) => handlePropChange('cvc', e as React.ChangeEvent<HTMLInputElement>)
  });

  return (
    <div className="space-y-4 min-w-[300px]">
      <legend className="text-xs font-bold uppercase tracking-widest text-secondary block mb-2">Secure Card Details</legend>
      <div className="rounded-lg shadow-sm shadow-black/5 bg-paper">
        <div className="relative focus-within:z-10">
          <Input
            className="peer rounded-b-none pe-9 shadow-none text-lg py-6"
            {...numberProps}
            id={`number-${id}`}
            placeholder="Card Number"
          />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-secondary/80 peer-disabled:opacity-50">
            {meta.cardType ? (
              <svg
                className="overflow-hidden rounded-sm"
                {...getCardImageProps({ images: images as unknown as CardImages })}
                width={28}
              />
            ) : (
              <CreditCard size={20} strokeWidth={2} aria-hidden="true" />
            )}
          </div>
        </div>
        <div className="-mt-px flex">
          <div className="min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-e-none rounded-t-none shadow-none text-lg py-6"
              {...expiryProps}
              id={`expiry-${id}`}
              placeholder="MM/YY"
            />
          </div>
          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-s-none rounded-t-none shadow-none text-lg py-6"
              {...cvcProps}
              id={`cvc-${id}`}
              placeholder="CVC"
            />
          </div>
        </div>
      </div>
      {meta.isTouched && meta.error && <p className="text-red-500 text-xs mt-2 font-bold">{meta.error}</p>}
      <p className="mt-2 text-xs text-secondary/60 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span> 256-bit Secure Encryption
      </p>
    </div>
  );
}

export { PaymentDetailsInput };
