import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/system";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CheckBoxPage() {
  return (
    <Box>
      <Checkbox {...label} color="default" />
    </Box>
  );
}
