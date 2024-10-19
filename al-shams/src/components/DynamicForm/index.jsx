import React, {
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import { useForm, Controller } from "react-hook-form";
import "./dynamicForm.scss";
import UploadPhotoGallery from "../UploadPhotoGallery";
import CustomSelect from "../CustomSelect";

const DynamicForm = forwardRef(
  (
    {
      fields,
      initialData = {},
      formId,
      onDataChange,
      title,
      features = [],
      imageSectionTitle,
      descriptionHeading,
      descriptPlaceholder,
      auctionSheetSection,
      columns = 1,
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      control,
      watch,
      setValue,
      getValues,
      formState: { errors },
    } = useForm({
      defaultValues: {
        ...initialData,
        features: initialData.FEATURES || [],
        DESCRIPTION: initialData.DESCRIPTION || "",
        auctionVerified: "no",
      },
      mode: "onChange",
    });

    const auctionVerified = watch("auctionVerified");
    const auctionSheet = watch("auctionSheet");
    useImperativeHandle(ref, () => ({
      getFormData: () => {
        return getValues();
      },
      isFormValid: () => {
        const values = getValues();
        let isValid = true;

        fields.forEach((field) => {
          if (Array.isArray(field)) {
            field.forEach((nestedField) => {
              if (nestedField.required && !values[nestedField.name]) {
                isValid = false;
              }
            });
          } else {
            if (field.required && !values[field.name]) {
              isValid = false;
            }
          }
        });

        if (auctionSheetSection && auctionVerified === "yes" && !auctionSheet) {
          isValid = false;
        }

        return isValid;
      },
    }));
    useEffect(() => {
      if (initialData.AUCTION_SHEET) {
        setValue("auctionSheet", { name: initialData.AUCTION_SHEET });
      }
    }, [initialData.AUCTION_SHEET, setValue]);

    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
      };
    };

    const handleFormChange = useCallback(
      debounce((data) => {
        if (onDataChange) {
          onDataChange(formId, data);
        }
      }, 500),
      [formId, onDataChange]
    );

    const fieldsClassName = `dynamic-form__fields ${
      columns === 2 ? "two-column" : columns === 3 ? "three-column" : ""
    }`;

    return (
      <div className="dynamic-form">
        <h2 className="dynamic-form__title">{title}</h2>
        {title && (
          <h4 className="dynamic-form__tagline">
            (All fields marked with * are mandatory)
          </h4>
        )}
        <form className="dynamic-form__form">
          <div className={fieldsClassName}>
            {fields.map((field, index) => {
              const registerOptions = {
                required: field.required && `${field.label} is required`,
              };

              if (field.type === "number") {
                registerOptions.validate = {
                  isNumber: (value) => {
                    if (!value) return true;
                    const isValidNumber =
                      !isNaN(value) && value.toString().trim() !== "";
                    return isValidNumber || "Please enter a valid number";
                  },
                };
              }

              return (
                <div key={index} className="dynamic-form__form__group">
                  <label className="dynamic-form__label">
                    {field.label} {field.required && "*"}
                  </label>
                  {field.type === "text" && (
                    <input
                      className={`dynamic-form__input ${
                        errors[field.name] ? "error" : ""
                      }`}
                      type="text"
                      {...register(field.name, registerOptions)}
                      placeholder={`Enter ${field.label}`}
                    />
                  )}
                  {field.type === "number" && (
                    <div className="dynamic-form__input-unit-wrapper">
                      <input
                        className={`dynamic-form__input with-unit ${
                          errors[field.name] ? "error" : ""
                        }`}
                        type="number"
                        {...register(field.name, registerOptions)}
                        placeholder={`Enter ${field.label}`}
                      />
                      {field.unit && !Array.isArray(field.unit) && (
                        <div className="dynamic-form__unit-box">
                          {field.unit}
                        </div>
                      )}
                      {field.unit && Array.isArray(field.unit) && (
                        <select
                          className="dynamic-form__unit-dropdown"
                          {...register(`${field.name}Unit`)}
                        >
                          {field.unit.map((unitOption, idx) => (
                            <option key={idx} value={unitOption}>
                              {unitOption}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}
                  {field.type === "select" && (
                    <Controller
                      control={control}
                      name={field.name}
                      render={({ field: { value, onChange } }) => (
                        <CustomSelect
                          options={field.options}
                          selectedOption={value}
                          onSelect={(option, optionValue) => {
                            onChange(optionValue);
                            if (field.onChange) {
                              field.onChange(optionValue);
                            }
                            handleFormChange(getValues());
                          }}
                          placeholder={`Select ${field.label}`}
                        />
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {auctionSheetSection && (
            <div className="dynamic-form__form__auction-verification">
              <h4 className="dynamic-form__form__auction-verification__auction-title">
                Do you have a verified auction sheet?
              </h4>
              <div className="dynamic-form__form__auction-verification__auction-options">
                <button
                  type="button"
                  className={`dynamic-form__form__auction-verification__auction-options__button ${
                    auctionVerified === "yes" ? "active" : ""
                  }`}
                  onClick={() => setValue("auctionVerified", "yes")}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`dynamic-form__form__auction-verification__auction-options__button ${
                    auctionVerified === "no" ? "active" : ""
                  }`}
                  onClick={() => {
                    setValue("auctionVerified", "no");
                    setValue("auctionSheet", null);
                  }}
                >
                  No
                </button>
              </div>
              <div className="dynamic-form__form__auction-verification__auction-upload">
                <label className="dynamic-form__form__auction-verification__label">
                  {auctionSheet ? "" : <i className="upload-icon"></i>}
                  <span className="dynamic-form__form__auction-verification__label__text">
                    {auctionSheet
                      ? auctionSheet.name
                      : "Upload Auction Verification Sheet"}
                  </span>
                  <input
                    className="dynamic-form__form__auction-verification__input"
                    type="file"
                    {...register("auctionSheet")}
                    accept="application/pdf"
                    onChange={(e) =>
                      setValue("auctionSheet", e.target.files[0])
                    }
                    disabled={auctionVerified !== "yes"}
                  />
                </label>
              </div>
            </div>
          )}

          {descriptionHeading && (
            <div className="dynamic-form__description">
              <h3 className="dynamic-form__description__heading">
                {descriptionHeading}
              </h3>
              <textarea
                className="dynamic-form__description__textarea"
                {...register("description")}
                placeholder={descriptPlaceholder || "Enter Vehicle Description"}
                defaultValue={initialData.DESCRIPTION || ""}
              />
            </div>
          )}
          {imageSectionTitle && (
            <div className="dynamic-form__image-upload">
              <Controller
                control={control}
                name="images"
                defaultValue={[]}
                render={({ field: { value, onChange } }) => (
                  <UploadPhotoGallery
                    value={value}
                    onChange={(data) => {
                      setValue("images", data.newImages);
                      setValue("initialImages", data.initialImages);
                    }}
                    imageSectionTitle={imageSectionTitle}
                    initialData={initialData}
                  />
                )}
              />
            </div>
          )}

          {features.length > 0 && (
            <div className="dynamic-form__features">
              {features.map((item) => (
                <div key={item._id} className="dynamic-form__features__group">
                  <Controller
                    control={control}
                    name="features"
                    defaultValue={initialData?.FEATURES || []}
                    render={({ field: { value = [], onChange } }) => {
                      const selectedFeatureIds = value.map((v) =>
                        typeof v === "string" ? v : v._id
                      );
                      const isChecked = selectedFeatureIds.includes(item._id);

                      useEffect(() => {
                        if (initialData?.FEATURES?.length > 0) {
                          onChange(initialData.FEATURES);
                        }
                      }, [initialData, onChange]);

                      return (
                        <>
                          <input
                            className="dynamic-form__features__checkbox"
                            type="checkbox"
                            value={item._id}
                            checked={isChecked}
                            onChange={(e) => {
                              let newValue;
                              setValue("onChangeCalled", true);

                              if (e.target.checked) {
                                newValue = [...selectedFeatureIds, item._id];
                              } else {
                                newValue = selectedFeatureIds.filter(
                                  (id) => id !== item._id
                                );
                              }
                              onChange(newValue);
                            }}
                          />
                          <label className="dynamic-form__features__label">
                            {item.name}
                          </label>
                        </>
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }
);

export default DynamicForm;
