import styled from "styled-components";
import ModalLayout from "../reuseables/ModalLayout";

export default function AppModal({
  children,
  heading,
  closeModal,
  maxWidth,
  headingSize,
  padding,
}) {
  return (
    <ModalLayout maxWidth={maxWidth} padding={padding} closeModal={closeModal}>
      <AppModalStyle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div className="heading">
            <h1 style={{ fontSize: headingSize }}>{heading}</h1>
          </div>
          <svg
            onClick={() => {
              closeModal();
            }}
            style={{
              cursor: "pointer",
            }}
            width="30"
            height="32"
            viewBox="0 0 40 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30.5002 9.99224C30.1888 9.66455 29.7661 9.48039 29.3252 9.48039C28.8843 9.48039 28.4616 9.66455 28.1502 9.99224L20.0002 18.5322L11.8502 9.97474C11.5388 9.64705 11.1161 9.46289 10.6752 9.46289C10.2343 9.46289 9.81158 9.64705 9.5002 9.97474C8.8502 10.6572 8.8502 11.7597 9.5002 12.4422L17.6502 20.9997L9.5002 29.5572C8.8502 30.2397 8.8502 31.3422 9.5002 32.0247C10.1502 32.7072 11.2002 32.7072 11.8502 32.0247L20.0002 23.4672L28.1502 32.0247C28.8002 32.7072 29.8502 32.7072 30.5002 32.0247C31.1502 31.3422 31.1502 30.2397 30.5002 29.5572L22.3502 20.9997L30.5002 12.4422C31.1335 11.7772 31.1335 10.6572 30.5002 9.99224Z"
              fill="#212121"
            />
          </svg>
        </div>
        <div>{children}</div>
      </AppModalStyle>
    </ModalLayout>
  );
}

const AppModalStyle = styled.div`
  position: relative;
  .heading {
    position: relative;
    width: fit-content;

    h1 {
      font-weight: 500;
      z-index: 1;
      font-size: 20px;
    }
  }
`;
