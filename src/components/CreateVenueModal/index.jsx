import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styles from "./CreateVenueModal.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenue } from "../../api/createVenue";
import { updateVenue } from "../../api/updateVenue";
import { deleteVenue } from "../../api/deleteVenue";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  media: yup.array().of(yup.string().url("Invalid URL")),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Max Guests is required"),
  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  rating: yup.number(),

  location: yup.object().shape({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
});

const CreateVenueForm = ({
  open,
  onClose,
  venue,
  update = false,
  title,
  onVenueChange,
}) => {
  const defaultVenue = {
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  };
  const currentVenue = venue || defaultVenue;
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: currentVenue,
  });

  useEffect(() => {
    reset(venue || defaultVenue);
  }, [venue]);

  const onSubmit = async (data) => {
    let response;
    if (update) {
      response = await updateVenue(data, venue.id);
    } else {
      response = await createVenue(data);
    }

    if (response) {
      reset();
      onClose();
      onVenueChange();
    }
  };

  const handleDeleteVenue = async (id) => {
    await deleteVenue(id);
    onVenueChange();
    onClose();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <button
        type="button"
        onClick={() => handleDeleteVenue(currentVenue.id)}
        className={`btn-link ${styles.deleteBtn}`}
      >
        Delete Venue
      </button>
      <DialogContent>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("name")}
            label="Name"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("description")}
            label="Description"
            required
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          {fields.map((item, index) => (
            <div className={styles.mediaContainer} key={item.id}>
              <TextField
                {...register(`media.${index}`)}
                label={`Media URL ${index + 1}`}
                defaultValue={item}
              />
              <button
                type="button"
                className="btn-link"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="btn-link" onClick={() => append("")}>
            Add Media
          </button>
          <TextField
            {...register("price")}
            label="Price"
            type="number"
            required
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          <TextField
            {...register("maxGuests")}
            label="Max Guests"
            type="number"
            required
            error={!!errors.maxGuests}
            helperText={errors.maxGuests?.message}
          />
          <TextField
            {...register("rating")}
            label="Rating"
            type="number"
            error={!!errors.rating}
            helperText={errors.rating?.message}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!watch("meta.wifi")}
                onChange={(e) => setValue("meta.wifi", e.target.checked)}
              />
            }
            label="Wifi"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!watch("meta.parking")}
                onChange={(e) => setValue("meta.parking", e.target.checked)}
              />
            }
            label="Parking"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!watch("meta.breakfast")}
                onChange={(e) => setValue("meta.breakfast", e.target.checked)}
              />
            }
            label="Breakfast"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!watch("meta.pets")}
                onChange={(e) => setValue("meta.pets", e.target.checked)}
              />
            }
            label="Pets"
          />
          <TextField
            {...register("location.address")}
            label="Address"
            error={!!errors.location?.address}
            helperText={errors.location?.address?.message}
          />
          <TextField
            {...register("location.city")}
            label="City"
            error={!!errors.location?.city}
            helperText={errors.location?.city?.message}
          />
          <TextField
            {...register("location.zip")}
            label="ZIP Code"
            error={!!errors.location?.zip}
            helperText={errors.location?.zip?.message}
          />
          <TextField
            {...register("location.country")}
            label="Country"
            error={!!errors.location?.country}
            helperText={errors.location?.country?.message}
          />
          <TextField
            {...register("location.continent")}
            label="Continent"
            error={!!errors.location?.continent}
            helperText={errors.location?.continent?.message}
          />
          <TextField
            {...register("location.lat")}
            label="Latitude"
            type="number"
            error={!!errors.location?.lat}
            helperText={errors.location?.lat?.message}
          />
          <TextField
            {...register("location.lng")}
            label="Longitude"
            type="number"
            error={!!errors.location?.lng}
            helperText={errors.location?.lng?.message}
          />
          <div className={styles.btnContainer}>
            {" "}
            <button className="btn" type="submit">
              Save
            </button>
            <button className="btn-link" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVenueForm;
