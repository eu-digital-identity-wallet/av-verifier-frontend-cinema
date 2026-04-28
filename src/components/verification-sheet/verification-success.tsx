import Checkmark from '../../assets/checkmark.svg';
import { Button } from '../ui/button';

export function VerificationSuccess({
  setBuyTicket,
}: {
  setBuyTicket: (value: boolean) => void;
}) {
  return (
    <div className="mt-4">
      <h4 className="text-xl font-bold text-black">Thank You!</h4>
      <p className="mt-2 text-black">
        Your age has been successfully verified. <br /> You will be redirected
        shortly... <br />
        <br /> If you are not redirected within a few seconds, click next
      </p>
      <img
        src={Checkmark}
        className="mx-auto mt-8 flex"
        alt="Verification successful"
      />
      <Button
        onClick={() => setBuyTicket(true)}
        text="Next"
        className="mt-8 w-full text-black"
      />
    </div>
  );
}
