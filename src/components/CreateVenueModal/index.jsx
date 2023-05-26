import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styles from "./CreateVenueModal.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVenue } from "../../api/createVenue";
import { updateVenue } from "../../api/updateVenue";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  media: yup.array().of(yup.string().url("Invalid URL")),
  price: yup.number().required("Price is required"),
  maxGuests: yup.number().required("Max Guests is required"),
  rating: yup.number(),
  wifi: yup.boolean(),
  parking: yup.boolean(),
  breakfast: yup.boolean(),
  pets: yup.boolean(),
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

const CreateVenueForm = ({ open, onClose, venue, update = false, title }) => {
  console.log(update);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: venue || {
      name: "",
      description: "",
      media: [],
      price: 0,
      maxGuests: 0,
      rating: 0,
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
      location: {
        address: "",
        city: "",
        zip: "",
        country: "",
        continent: "",
        lat: 0,
        lng: 0,
      },
    },
  });

  const onSubmit = async (data) => {
    if (update) {
      console.log(venue);
      //updateVenue(data, venue.id);
    } else {
      console.log(data);
      const response = await createVenue(data);
      console.log(response);
    }

    //reset();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
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
            <div key={item.id}>
              <TextField
                {...register(`media.${index}`)}
                label={`Media URL ${index + 1}`}
                defaultValue={item}
              />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={() => append("")}>Add Media</Button>
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
            control={<Checkbox {...register("wifi")} />}
            label="Wifi"
            error={!!errors.wifi}
            helperText={errors.wifi?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register("parking")} />}
            label="Parking"
            error={!!errors.parking}
            helperText={errors.parking?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register("breakfast")} />}
            label="Breakfast"
            error={!!errors.breakfast}
            helperText={errors.breakfast?.message}
          />
          <FormControlLabel
            control={<Checkbox {...register("pets")} />}
            label="Pets"
            error={!!errors.pets}
            helperText={errors.pets?.message}
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
          <Button type="submit">Save</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVenueForm;
