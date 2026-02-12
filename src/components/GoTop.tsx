import { FaArrowUpLong } from "react-icons/fa6";

interface GoTopProps {
  showGoTop: string;
  scrollUp: () => void;
}

export default function GoTop({ showGoTop, scrollUp }: GoTopProps) {
  return (
    <>
      <div className={showGoTop} onClick={scrollUp}>
        <button className="goTop position-fixed bottom-0 end-0 z-1 bg-info text-dark p-3 border-0 fs-4" aria-labelledby="To top"><FaArrowUpLong className="goTop__text fs-4" /></button>
      </div>
    </>
  )
}
