import { Card } from 'react-bootstrap'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState } from 'react'

export default function CardLanguages({ languages, langIcons, sizeIcons }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(languages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLanguages = languages.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <Card className="rounded-0 border-0 shadow bg-dark-subtle text-primary h-100">
      <Card.Header className="text-primary text-center border border-top-0 border-start-0 border-end-0">
        <h2>Programming Languages</h2>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          {currentLanguages.map((lang, index) => (
            <div key={lang.name.toLowerCase()} className={`${lang.name.toLowerCase()} ${index !== currentLanguages.length - 1 ? 'border-bottom border-2 border-info' : ''} ${index === 0 ? 'pb-3' : 'py-3'}`}>
              <div className="fs-4 fw-medium d-flex justify-content-center align-items-center gap-1 mb-2">
                <span className={`${sizeIcons(lang)} d-flex`}>{langIcons[lang.name]}</span>
                <p className="m-0 text-primary">{lang.name}</p>
              </div>
              <div className="">
                <div className="progress" role="progressbar" aria-label={lang.name + " progressbar"} ariavaluenow={lang.progress} aria-valuemin="0" ariavaluemax="100">
                  <div className="progress-bar progress-bar-striped" style={{ width: lang.progress + '%', backgroundColor: lang.color }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto d-flex justify-content-center align-items-center gap-3">
          <FaAngleLeft
            className={`fs-4 ${currentPage === 1 ? 'text-gray' : 'cursor-pointer'}`}
            onClick={handlePrevPage}
            style={{ cursor: currentPage === 1 ? 'default' : 'pointer' }}
          />
          <div className="page-num d-flex justify-content-center gap-2 fs-5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <span
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`page-number ${currentPage === pageNum ? 'text-info fw-bold' : ''}`}
                style={{ cursor: 'pointer' }}
              >
                {pageNum}
              </span>
            ))}
          </div>
          <FaAngleRight
            className={`fs-4 ${currentPage === totalPages ? 'text-gray' : 'cursor-pointer'}`}
            onClick={handleNextPage}
            style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
