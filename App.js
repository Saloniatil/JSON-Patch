import React, { useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import Paper from "@mui/material/Paper";
import jsonpatch from "fast-json-patch";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";

const baseObject = {
  slug: "diya-foundation",
  name: "Diya Foundation",
  registration_number: "386/98-99",
  auditor_name: "Das Kumar And Company",
  created_at: "2013-02-08T09:28:51.000Z",
  updated_at: "2020-02-25T06:11:35.814Z",
  external_profiles: [
    {
      label: "Website",
      uri: "http://www.diyafoundation-india.org/Site/index.html",
    },
    {
      label: "Youtube",
      uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
    },
  ],
  tags: ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"],
};

const initialPatch = [
  {
    op: "replace",
    path: "/tags/5",
    value: "spbm18",
  },
  {
    op: "replace",
    path: "/tags/4",
    value: "bengaluru10k-18",
  },
  {
    op: "replace",
    path: "/tags/3",
    value: "lfc18-wow2",
  },
  {
    op: "replace",
    path: "/tags/2",
    value: "tcs10k-18",
  },
  {
    op: "replace",
    path: "/tags/1",
    value: "lfc18-cbp",
  },
  {
    op: "replace",
    path: "/tags/0",
    value: "lfc18",
  },
  {
    op: "add",
    path: "/tags/6",
    value: "housie18",
  },
  {
    op: "add",
    path: "/tags/7",
    value: "hoh18",
  },
  {
    op: "add",
    path: "/tags/8",
    value: "lfc19",
  },
  {
    op: "add",
    path: "/tags/9",
    value: "tbpp",
  },
  {
    op: "add",
    path: "/tags/10",
    value: "housie19",
  },
  {
    op: "add",
    path: "/tags/11",
    value: "gfc2020",
  },
  {
    op: "replace",
    path: "/external_profiles/1/uri",
    value: "https://www.facebook.com/pages/DIYA-Foundation/",
  },
  {
    op: "replace",
    path: "/external_profiles/1/label",
    value: "Facebook",
  },
  {
    op: "add",
    path: "/external_profiles/2",
    value: {
      label: "Youtube",
      uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
    },
  },
  {
    op: "add",
    path: "/official_name",
    value: "Diya Foundation",
  },
];

function App() {
  const [pendingPatches, setPendingPatches] = useState([]);
  const [code, setCode] = useState("");
  const [modifiedObject, setModifiedObject] = useState(baseObject);
  const [showModal, setShowModal] = useState(false);
  const [isPatchOperation, setIsPatchOperation] = useState(true);

  const handleInputChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
  };

  const handleRetrieve = () => {
    try {
      const patches = JSON.parse(code);
      if (isPatchOperation) {
        const newObject = jsonpatch.applyPatch(
          JSON.parse(JSON.stringify(modifiedObject)),
          patches
        ).newDocument;
        setModifiedObject(newObject);
        setPendingPatches(patches);
      } else {
        const newObject = JSON.parse(code);
        setModifiedObject(newObject);
        setPendingPatches([]);
      }
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
    setShowModal(false);
  };

  const handleReject = () => {
    setShowModal(false);
  };

  const openModalForPatch = () => {
    setIsPatchOperation(true);
    setShowModal(true);
  };

  const openModalForObject = () => {
    setIsPatchOperation(false);
    setShowModal(true);
  };

  const getLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => `${i + 1}`).join("\n");
  };

  return (
    <div style={{ maxWidth: 2000, margin: "auto", padding: 20 }}>
       <Button variant="outlined" color="neutral" onClick={openModalForObject}>
        Object
      </Button>  
      <Button variant="outlined" color="neutral" onClick={openModalForPatch}>
        Patch
      </Button>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <Paper style={{ height: 400, width: "50%", marginRight: 20 }}>
          <TableVirtuoso
            data={[modifiedObject]}
            itemContent={() => (
              <div>
                <h6 className="text-center">Base Object</h6>
                <pre>{JSON.stringify(modifiedObject, null, 2)}</pre>
              </div>
            )}
          />
        </Paper>

        <Paper style={{ height: 400, width: "50%" }}>
          <TableVirtuoso
            data={pendingPatches}
            itemContent={() => (
              <div>
                <h6 className="text-center">Patch Operations</h6>
                <pre>{JSON.stringify(pendingPatches, null, 2)}</pre>
              </div>
            )}
          />
        </Paper>
      </div>
<hr/>
      <div style={{ maxWidth: 2200, margin: "auto", padding: 20 }}>
        <h3 style={{ textAlign: "center", marginTop: 20 }}></h3>
        <div style={{ position: "relative", marginBottom: 20 }}>
          <textarea
            value={getLineNumbers()}
            readOnly
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 30,
              height: "80%",
              padding: 10,
              backgroundColor: "#e0e0e0",
              border: "1px solid #ddd",
              borderRadius: "5px 0 0 5px",
              fontFamily: "monospace",
              color: "#777",
              resize: "none",
              textAlign: "right",
              pointerEvents: "none",
            }}
          />
          <textarea
            value={code}
            onChange={handleInputChange}
            style={{
              width: "100%",
              height: 400,
              padding: "10px 10px 10px 40px",
              backgroundColor: "#f5f5f5",
              border: "1px  #FFFFF0",
              borderRadius: "0 5px 5px 0",
              fontFamily: "monospace",
              resize: "none",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              boxSizing: "border-box",
            }}
            placeholder='Type your code here... Example: [{"op":"replace","path":"/tags/0","value":"newTag"}]'
          />
        </div>
      </div>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Confirm Changes
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Are you sure you want to retrieve these changes?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: 2,
              justifyContent: "flex-end",
            }}
          >
            <Button variant="solid" color="primary" onClick={handleRetrieve}>
              Retrieve
            </Button>
            <Button variant="solid" color="primary" onClick={handleReject}>
              Reject
            </Button>
          </Box>
        </Sheet>
      </Modal>
    </div>
  );
}

export default App;
