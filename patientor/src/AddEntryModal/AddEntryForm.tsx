import React from 'react';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from 'formik';

import { useStateValue } from '../state';
import { EntryFormValues, EntryType } from '../types';
import { isDate } from '../utils';

import { TextField, DiagnosisSelection, TypeOption, SelectField, NumberField } from './FormField';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: 'Hospital', label: 'Hospital' },
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' }
];


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital,
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        },
        healthCheckRating: 0,
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const malformattedError = 'Invalid format of ';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        // Validate Hospital
        if (values.type === 'Hospital') {
          const date = values.discharge?.date;
          const criteria = values.discharge?.criteria;

          // Empty field
          if (!date) {
            errors.date = requiredError;
          } 
          if (!criteria) {
            errors.criteria = requiredError;
          }

          // Invalid data
          if (date && !isDate(date)) {
            errors.date = malformattedError + `date YYYY-MM-DD`;
          }
        }
        // Validate HealthCheck
        if (values.type === 'HealthCheck') {
          const rating = values?.healthCheckRating;

          if (!rating) {
            errors.healthCheckRating = 'Invalid or missing Health Check Rating';
          } else if (rating < 0 || rating > 3) {
            errors.healthCheckRating = 'Health check rating must be between 0-3'; 
          }
        }
        // Validate OccupationalHealthcare
        if (values.type === 'OccupationalHealthcare') {
          const startDate = values.sickLeave?.startDate;
          const endDate = values.sickLeave?.endDate;

          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          if (startDate && !isDate(startDate)) {
            errors.startDate = malformattedError + `date YYYY-MM-DD`;
          }
          if (endDate && !isDate(endDate)) {
            errors.endDate = malformattedError + `date YYYY-MM-DD`;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Entry Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date Of Visit"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />

            {values.type === 'Hospital' && (
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="description of discharge criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'HealthCheck' && (
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
              />
            )}
            {values.type === 'OccupationalHealthcare' && (
              <>
                <Field
                  label="Employer Name"
                  placeholder="name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            )}

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!(dirty && isValid)}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;