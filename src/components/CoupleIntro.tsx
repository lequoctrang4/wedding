import React from "react";

interface CoupleIntroProps {
  groomName: string;
  brideName: string;
  photo?: string;
}

const CoupleIntro: React.FC<CoupleIntroProps> = ({
  groomName,
  brideName,
  photo,
}) => {
  return (
    <>
      <div className="couple-intro animate-scale-in">Cô Dâu & Chú Rể</div>

      <div className="couple-main-names animate-slide-up">
        {brideName} & {groomName}
      </div>

      {photo && (
        <img
          src={photo}
          alt="Couple"
          className="couple-photo-large animate-fade-in"
        />
      )}
    </>
  );
};

export default CoupleIntro;
