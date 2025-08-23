"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  updateNestedField,
  updateTechHighlightCreation,
  createPortfolio,
  updateCurrentStatusCreation,
} from "../../store/portfolioSlice/portfolioSlice";
import PortfolioWizard from "./wizard/PortfolioWizard";

function PortfolioForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { portfolioData, isSubmitting, submitMessage, error } = useSelector(
    (state) => state.portfolio
  );

  useEffect(() => {}, [portfolioData]);

  const handleAddArrayItem = (section, field, defaultValue) => {
    dispatch(addArrayItem({ section, field, defaultValue }));
  };

  const handleRemoveArrayItem = (section, field, index) => {
    dispatch(removeArrayItem({ section, field, index }));
  };

  const handleUpdateArrayItem = (section, field, index, value) => {
    dispatch(updateArrayItem({ section, field, index, value }));
  };

  const handleUpdateNestedField = (section, field, value) => {
    dispatch(updateNestedField({ section, field, value }));
  };

  const handleUpdateCurrentStatus = (index, field, value) => {
    dispatch(updateCurrentStatusCreation({ index, field, value }));
  };

  const handleUpdateTechHighlight = (index, field, value) => {
    dispatch(updateTechHighlightCreation({ index, field, value }));
  };

  const handleSubmit = async () => {
    if (!portfolioData.heroSection.name.trim()) {
      dispatch({
        type: "portfolio/setSubmitMessage",
        payload: "Error: Name is required",
      });
      return;
    }

    if (!portfolioData.contactInfo.email.trim()) {
      dispatch({
        type: "portfolio/setSubmitMessage",
        payload: "Error: Email is required",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(portfolioData.contactInfo.email)) {
      dispatch({
        type: "portfolio/setSubmitMessage",
        payload: "Error: Please enter a valid email address",
      });
      return;
    }

    console.log(
      "[Client] Submitting form data:",
      JSON.stringify(portfolioData, null, 2)
    );

    try {
      const action = await dispatch(createPortfolio(portfolioData));
      if (createPortfolio.fulfilled.match(action)) {
        const { payload } = action;
        sessionStorage.setItem("portfolioId", payload.portfolioId);
        navigate(
          `/otpverification?email=${encodeURIComponent(
            portfolioData.contactInfo.email
          )}`
        );
      }
    } catch (err) {
      console.error("[Client] Submit error details:", err);
    }
  };

  return (
    <PortfolioWizard
      portfolioData={portfolioData}
      isSubmitting={isSubmitting}
      submitMessage={submitMessage}
      error={error}
      onUpdateNestedField={handleUpdateNestedField}
      onUpdateArrayItem={handleUpdateArrayItem}
      onAddArrayItem={handleAddArrayItem}
      onRemoveArrayItem={handleRemoveArrayItem}
      onUpdateCurrentStatus={handleUpdateCurrentStatus}
      onUpdateTechHighlight={handleUpdateTechHighlight}
      onSubmit={handleSubmit}
    />
  );
}

export default PortfolioForm;