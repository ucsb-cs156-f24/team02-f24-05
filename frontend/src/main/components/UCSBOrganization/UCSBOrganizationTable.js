import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";

import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/UCSBOrganizationUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function OrganizationTable({
  organizations,
  currentUser,
  testIdPrefix = "OrganizationTable",
}) {
  const navigate = useNavigate();
  const editCallback = (cell) => {
    navigate(`/ucsborganizations/edit/${cell.row.values.orgField}`);
  };
  // Stryker disable all : hard to test for query caching
  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/ucsborganizations/all"],
  );
  // Stryker restore all
  // Stryker disable next-line all : TODO try to make a good test for this
  const deleteCallback = async (cell) => {
    deleteMutation.mutate(cell);
  };
  const columns = [
    {
      Header: "Organization Field",
      accessor: "orgField", // accessor is the "key" in the data
    },
    {
      Header: "Organization Translation Short",
      accessor: "orgTranslationShort",
    },
    {
      Header: "Organization Translation",
      accessor: "orgTranslation",
    },
    {
      Header: "Inactive",
      // for boolean
      accessor: (organizations) => organizations.inactive.toString(),
    },
  ];
  if (hasRole(currentUser, "ROLE_ADMIN")) {
    columns.push(ButtonColumn("Edit", "primary", editCallback, testIdPrefix));
    columns.push(
      ButtonColumn("Delete", "danger", deleteCallback, testIdPrefix),
    );
  }
  return (
    <OurTable data={organizations} columns={columns} testid={testIdPrefix} />
  );
}
