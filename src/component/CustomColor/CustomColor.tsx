"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { MuiColorInput } from "mui-color-input";
import { v4 as uuidv4 } from "uuid";

interface customColorType {
  id: number;
  color: string;
}

export function CustomColor() {
  const [pickupColor, setPickupColor] = useState<string>();
  const [colors, setColors] = useState<customColorType[]>([
    { id: '29228a64-505c-47d1-a949-55f2ff50ae55"', colors: ["#1f2041", "#4B3F72", "#417B5A", "#d0ceba",  "#E9D2C0" ] },
  ]);
  const [id, setId] = useState<number | null>();

  const handleColorPicker = (newValue, id) => {
    setId(id);
    console.log(newValue, id);
   const update =  colors.map((unit) => {
   const updatedColor =  unit.colors.map((color, index)=>{
      console.log(index, id);
       if (index === id) {
        return color = newValue;
      } 
      return color;
     })
     return {...unit, colors : updatedColor}
    });
    console.log(update)
    setColors(update)
    setPickupColor(newValue);
    // setColors((prev)=>[...prev, newValue]);
  };

  const handleSaveYourCustomPalette = (colors) =>{
  const yourCollection = localStorage.getItem('selectedColorPalette')
  const selectedColorPalette = JSON.parse(yourCollection);
  colors.map((unit)=>{
    if(unit.id){
      unit.id =  uuidv4()
    }
  })
  const palette = [...selectedColorPalette, colors[0]];
  console.log(palette)
  localStorage.setItem('selectedColorPalette', JSON.stringify(palette));
  }

  return (
    <Box
      width="100%"
      minHeight="80vh"
      padding={{ xs: 2, sm: 4, md: 8 }}
      bgcolor={"gray"}
    >
      <Grid container spacing={3} justifyContent="center" flexWrap="wrap">
        <Box
          //   ref={paletteRef}
          //   id={singlePalette?.id}
          //   key={`palette-${singlePalette?.id}`}
          display="flex"
          // flexDirection="column"
          alignContent="center"
          width={"100%"}
          height={"100%"}
          // borderRadius={4}
          margin={1}
          // onClick={(e)=>showFullDetailsOfColors(e, unit)}
        >
          {colors?.map((unit, index) => (
            unit?.colors?.map((color, index)=>{
                return (
              <Box
                className={"nestedDiv"}
                id={index}
                key={index}
                width="100%"
                height={"60vh"}
                bgcolor={color}
                display="flex"
                alignItems="flex-end"
                paddingLeft="5px"
                sx={{
                  cursor: "pointer",
                  // borderTopLeftRadius: colorIndex === 0 ? 10 : 0,
                  // borderTopRightRadius: colorIndex === 0 ? 10 : 0,
                  // borderBottomLeftRadius: colorIndex === 4 ? 10 : 0,
                  // borderBottomRightRadius: colorIndex === 4 ? 10 : 0,
                  "&:hover .color-value": { opacity: 1 },
                }}
              >
                {/* <TextField type="color" value={pickupColor}  onChange={(e)=>handleColorPicker(e)}/> */}
                <MuiColorInput
                  format="hex"
                  value={unit.color}
                  onChange={(newValue) => handleColorPicker(newValue, index)}
                  // PopoverProps={{
                  //   // These props are forwarded to MUI Popover
                  //   PaperProps: {
                  //     // add a data attribute with the current color (used by CSS)
                  //     "data-color": unit.color,
                  //     sx: {
                  //       // leave space at bottom so the text isn't on top of controls
                  //       pb: 3,
                  //       // position: "relative",
                  //       // create an absolutely positioned label inside the paper
                  //       "&::after": {
                  //         content: "attr(data-color)", // reads the data-color attribute
                  //         position: "absolute",
                  //         bottom: 8,
                  //         left: "50%",
                  //         transform: "translateX(-50%)",
                  //         bgcolor: "background.paper",
                  //         px: 1,
                  //         py: 0.5,
                  //         borderRadius: 1,
                  //         boxShadow: 1,
                  //         fontFamily: "monospace",
                  //         fontWeight: 600,
                  //         // color of the text — adjust to taste
                  //         color: "text.primary",
                  //       },
                  //     },
                  //   },
                  // }}
                />

                <Typography
                  className="color-value"
                  fontSize="15px"
                  color="white"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "2px 8px",
                    // borderRadius: "4px",
                    marginBottom: "5px",
                  }}
                  //   onClick={(e) => handleCopyText(e, hex)}
                >
                  {/* {hex} */}
                </Typography>
              </Box>
            );
            })
          ))}
        </Box>
        <Button onClick={()=>handleSaveYourCustomPalette(colors)}>SAVE</Button>
      </Grid>

      {/* <ToastContainer /> */}
    </Box>
  );
}
