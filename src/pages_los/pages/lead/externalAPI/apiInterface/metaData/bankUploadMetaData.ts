import { MetaDataType } from "components/dyanmicForm";

export const BankUploadMetaData: MetaDataType = {
  form: {
    name: "bankUploadAPI",
    label: "Bank Upload Request Interface",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    render: {
      ordering: "auto",
      renderType: "simple",
      gridConfig: {
        item: {
          xs: 12,
          sm: 3,
          md: 3,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      datePicker: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      textField: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "select",
      },
      name: "entity",
      label: "Entity",
      defaultValue: "1",
      options: [
        { value: "L", label: "Legal" },
        { value: "I", label: "Individual" },
      ],
    },
    {
      render: {
        componentType: "select",
      },
      name: "management",
      label: "Management Person",
      //@ts-ignore
      options: "getManagementPersonnel",
      dependentFields: ["entity"],
      shouldExclude: "shouldExcludeExternalAPIManagementDetails",
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "fromDate",
      label: "From Date",
      format: "MM/yyyy",
      placeholder: "mm/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "required",
            params: ["required field"],
          },
        ],
      },
    },
    {
      render: {
        componentType: "datePicker",
      },
      name: "toDate",
      label: "To Date",
      format: "MM/yyyy",
      placeholder: "mm/yyyy",
      schemaValidation: {
        type: "date",
        rules: [
          {
            name: "required",
            params: ["required field"],
          },
        ],
      },
      dependentFields: ["fromDate"],
      validationRun: "all",
      runValidationOnDependentFieldsChange: true,
      validate: {
        conditions: {
          any: [
            {
              fact: "dependentFields",
              path: "$.fromDate.value",
              operator: "lessThanDate",
              value: {
                fact: "currentField",
                path: "$.value",
              },
            },
          ],
        },
        success: "",
        failure: "To date must be gerater than from date",
      },
    },
    {
      render: {
        componentType: "select",
      },
      name: "acceptancePolicy",
      label: "Acceptance Policy",
      //@ts-ignore
      options: "getAcceptancePolicy",
    },
    {
      render: {
        componentType: "select",
      },
      name: "bank",
      label: "Bank",
      disableCaching: true,
      dependentFields: ["entity", "management"],
      //@ts-ignore
      options: "getBankListForLeadDocumentsForAPICallInterface",
    },
    {
      render: {
        componentType: "select",
      },
      name: "bankFacility",
      label: "Bank Facility",
      dependentFields: ["entity", "management"],
      //@ts-ignore
      options: "getBankFacilityOptions",
      //@ts-ignore
      disableCaching: true,
    },
    {
      render: {
        //@ts-ignore
        componentType: "currencyWithoutWords",
      },
      name: "loanAmount",
      label: "Loan Amount",
      placeholder: "Loan Amount",
      defaultValue: "500000",
      isReadOnly: true,
    },
    {
      render: {
        componentType: "textField",
      },
      name: "loanDuration",
      type: "number",
      label: "Loan Duration",
      placeholder: "Loan Duration",
      maxLength: 2,
      required: true,
    },
    {
      render: {
        //@ts-ignore
        componentType: "textField",
      },
      name: "loanType",
      label: "Loan Type",
      placeholder: "Loan Type",
      defaultValue: "Home",
      required: true,
    },
    {
      render: {
        componentType: "select",
      },
      name: "sanctionLimitFixed",
      label: "Sanction Limit Fixed",
      //@ts-ignore
      options: "getYesOrNoOptions",
      //@ts-ignore
      disableCaching: true,
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "currency",
      },
      name: "sanctionLimitFixedAmount",
      label: "Sanction Limit Fixed Amount",
      placeholder: "Sanction Limit Fixed Amount",
      dependentFields: ["bankFacility", "sanctionLimitFixed"],
      shouldExclude:
        "shouldExcludeSanctionLimitFixedAmountDocumentUploadBankDetailsOD",
      required: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },

    {
      render: {
        componentType: "arrayField",
      },
      name: "documentUploadBankDetailsOD",
      dependentFields: [
        "bankFacility",
        "sanctionLimitFixed",
        "fromDate",
        "toDate",
      ],
      shouldExclude: "shouldExcludeDocumentUploadBankDetailsOD",
      fixedRows: true,
      getFixedRowsCount: "getCountForRow",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "sanctionLimitVariableAmounts",
          label: "Sanction Limit Variable Amounts",
          placeholder: "Sanction Limit Variable Amounts",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
      },
      name: "documentUploadBankDetailsCC1",
      dependentFields: ["bankFacility", "sanctionLimitFixed"],
      shouldExclude: "shouldExcludeDocumentUploadBankDetailsCC1",
      fixedRows: true,
      getFixedRowsCount: 1,
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "sanctionLimitFixedAmount",
          label: "Sanction Limit Fixed Amount",
          placeholder: "Sanction Limit Fixed Amount",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "	drawingPowerVariableAmounts",
          label: "	Drawing Power Variable Amounts",
          placeholder: "	Drawing Power Variable Amounts",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
      },
      name: "documentUploadBankDetailsCC",
      dependentFields: [
        "bankFacility",
        "sanctionLimitFixed",
        "fromDate",
        "toDate",
      ],
      shouldExclude: "shouldExcludeDocumentUploadBankDetailsCC",
      fixedRows: true,
      getFixedRowsCount: "getCountForRow",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "sanctionLimitVariableAmounts",
          label: "Sanction Limit Variable Amounts",
          placeholder: "Sanction Limit Variable Amounts",
          // dependentFields: ["sanctionLimitFixed"],
          // shouldExclude:
          //   "shouldExcludeSanctionLimitAmountsDocumentUploadBankDetailsCC",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "currency",
          },
          name: "	drawingPowerVariableAmounts",
          label: "	Drawing Power Variable Amounts",
          placeholder: "	Drawing Power Variable Amounts",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
      ],
    },
  ],
};
