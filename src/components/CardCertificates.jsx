import { Dropdown, Card, Col, Row } from 'react-bootstrap'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useState } from 'react'

export default function CardCertificates({ certificates, langIcons, iconClass }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCertificates = certificates.slice(startIndex, endIndex);

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

  const languagesDiv = (languagesArray) => {
    const languageArray = Array.isArray(languagesArray) ? languagesArray : [languagesArray];
    return (
      <>
        <div className="d-flex align-items-center">
          <span className={iconClass(languageArray[0])}>{langIcons[languageArray[0]]}</span>
          <Dropdown>
            <Dropdown.Toggle className="p-0 text-decoration-none ms-1 bg-transparent border-0 text-light">
              +{languageArray.length - 1}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              {languageArray.slice(1).map((lang, idx) => (
                <Dropdown.Item key={idx} className="d-flex align-items-center gap-2">
                  <span className={iconClass(lang)}>
                    {langIcons[lang]}
                  </span>
                  <span>{lang}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </>
    )
  }

  return (
    <Card className="h-100 rounded-0 border-0 shadow bg-dark-subtle text-primary">
      <Card.Header className="text-primary text-center border border-top-0 border-start-0 border-end-0">
        <h2>Certificates</h2>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <div className="bit-academy-certificates d-flex flex-column align-items-center">
          <h2 className="mb-3">Bit Academy:</h2>
          <Row id="certificates-div" className="fs-4 mb-auto w-100">
            {currentCertificates.map((cert, index) => (
              <Col key={index} xs={12} md={6} className="my-2 px-2">
                <div className="certificate-item d-flex align-items-center gap-2 bg-dark p-2 h-100">
                  {cert.language.length > 2 ? languagesDiv(cert.language) : null}
                  {cert.language.length <= 2 ? cert.language.map((lang, idx) => (
                    <span key={idx} className={iconClass(lang)}>
                      {langIcons[lang]}
                    </span>
                  )) : null}
                  <span className="text-start">{cert.name}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
        <div
          id="certificates-pagination"
          className="mt-auto d-flex justify-content-center align-items-center gap-3">
          <FaAngleLeft
            id="prev-page"
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
            id="next-page"
            className={`fs-4 ${currentPage === totalPages ? 'text-gray' : 'cursor-pointer'}`}
            onClick={handleNextPage}
            style={{ cursor: currentPage === totalPages ? 'default' : 'pointer' }}
          />
        </div>
      </Card.Body>
    </Card>
  )
}
