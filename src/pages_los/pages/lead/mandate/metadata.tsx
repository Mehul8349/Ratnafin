import { MetaDataType } from "components/dyanmicForm/types";
import {
  calculateAmount,
  calculatePercentage,
  visaversaValidateValue,
} from "./fns";

export const mandateMetaData: MetaDataType = {
  form: {
    name: "mandate",
    label: "Mandate",
    resetFieldOnUmnount: false,
    validationRun: "onBlur",
    submitAction: "",
    render: {
      ordering: "auto",
      renderType: "tabs",
      groups: {
        0: "Facility Details",
        1: "Disbursement Tranches Details",
        2: "Elite Services Charges Details",
        3: "Other Details",
      },
      gridConfig: {
        item: {
          xs: 12,
          sm: 4,
          md: 4,
        },
        container: {
          direction: "row",
          spacing: 2,
        },
      },
    },
    componentProps: {
      textField: {
        fullWidth: true,
      },
      select: {
        fullWidth: true,
      },
      datePicker: {
        fullWidth: true,
      },
      numberFormat: {
        fullWidth: true,
      },
      inputMask: {
        fullWidth: true,
      },
    },
  },
  fields: [
    {
      render: {
        componentType: "arrayField",
        group: 0,
      },
      name: "facilityDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Facility Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "select",
          },
          name: "facilityType",
          label: "Type of Facility",
          placeholder: "Type of Facility",
          required: true,
          validate: "getValidateValue",
          defaultValue: "00",
          //@ts-ignore
          options: "getMandateTermsheetSanctionFacilityType",
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
          name: "fundAmount",
          label: "Amount of Fund to be raised",
          placeholder: "Amount of Fund to be raised",
          required: true,
          disableCaching: true,
          validate: "getValidateValue",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "visaversa",
            group: 0,
          },
          name: "feeDetails",
          label: "Visaversa Label",
          dependentFields: ["fundAmount"],
          leftName: "fundFeeInAmount",
          rightName: "fundFeeInPercent",
          leftLabel: "Fees in % of Absolute Amount",
          rightLabel: "Fees in % of Fund Raised",
          leftTransform: calculateAmount,
          rightTransform: calculatePercentage,
          required: true,
          validate: visaversaValidateValue,
        },
      ],
    },

    {
      render: {
        componentType: "arrayField",
        group: 1,
      },
      name: "disbursementMileStoneDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Disbursement Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "textField",
          },
          name: "disbursementSequence",
          label: "Disbursement Sequence",
          placeholder: "Disbursement Sequence (First,Second,Third)",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "rateOfInt",
          },
          name: "totalFeeAtDisbursementInPercent",
          label: "% of Total Fees at the time of Disbursement",
          placeholder: "% of Total Fees at the time of Disbursement",
          required: true,
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "description",
          label: "Description",
          placeholder: "Description",
          maxLength: 500,
          showMaxLength: false,
          GridProps: {
            xs: 12,
            md: 6,
            sm: 6,
          },
        },
      ],
    },
    {
      render: {
        componentType: "arrayField",
        group: 2,
      },
      name: "eliteServiceDetails",
      removeRowFn: "deleteAssignArrayFieldData",
      arrayFieldIDName: "lineNo",
      label: "Elite Services Details",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
      _fields: [
        {
          render: {
            componentType: "hidden",
          },
          name: "serialNo",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "select",
          },
          name: "serviceName",
          label: "Elite Serivce Name",
          placeholder: "Elite Serivce Name",
          //@ts-ignore
          options: "getEliteSeviceName",
          defaultValue: "00",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            //@ts-ignore
            componentType: "select",
          },
          name: "serviceChargeType",
          label: "Elite Services Charges Type",
          placeholder: "Elite Services Charges Type",
          //@ts-ignore
          options: "getEliteSeviceLumsumPer",
          defaultValue: "00",
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
          name: "serviceCharge",
          label: "Elite Services Charges",
          placeholder: "Elite Services Charges",
          GridProps: {
            xs: 12,
            md: 3,
            sm: 3,
          },
        },
        {
          render: {
            componentType: "textField",
          },
          name: "description",
          label: "Elite Description",
          placeholder: "Elite Description",
          maxLength: 500,
          showMaxLength: false,
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
        componentType: "hidden",
        group: 3,
      },
      name: "tranCD",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "rateOfInt",
        group: 3,
      },
      name: "totalFeeAtSanctionInPercent",
      label: "% of Total Fees at the time of Sanction",
      placeholder: "% of Total Fees at the time of Sanction",
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
        group: 3,
      },
      name: "advanceAmount",
      label: "Advance Amount",
      placeholder: "Advance Amount",
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        //@ts-ignore
        componentType: "select",
        group: 3,
      },
      name: "anyBankAproached",
      label: "Bank to be approched mentioned",
      placeholder: "Bank to be approched mentioned",
      defaultValue: "00",
      required: true,
      validate: "getValidateValue",
      //@ts-ignore
      options: "getYesOrNoOptions",
      disableCaching: true,
      GridProps: {
        xs: 12,
        md: 3,
        sm: 3,
      },
    },
    {
      render: {
        componentType: "spacer",
        group: 3,
      },
      name: "spacer",
      GridProps: {
        xs: 12,
        md: 12,
        sm: 12,
      },
    },
    {
      render: { componentType: "autocomplete", group: 3 },
      name: "bankNames",
      label: "Bank to be approched",
      placeholder: "Bank to be approched",
      required: true,
      //@ts-ignore
      options: "getPerfiosBankList",
      multiple: true,
      freeSolo: true,
      limitTags: -1,
      dependentFields: ["anyBankAproached"],
      shouldExclude: (_, dependentFields) => {
        if (dependentFields["anyBankAproached"].value === "Y") {
          return false;
        }
        return true;
      },
      GridProps: { xs: 12, md: 5, sm: 5 },
    },
  ],
};
