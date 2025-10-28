'use client'
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function CustomColor() {
    const [pickupColor, setPickupColor] = useState<string>();
    const [colors, setColors] = useState<string[]>(['red']);

    const handleColorPicker = (e : any) =>{
        setPickupColor(e.target.value);
        setColors((prev)=>[...prev, e.target.value]);
    }

  return (
    <Box width="100%" minHeight="100vh" padding={{ xs: 2, sm: 4, md: 8 }}>
      <Grid container spacing={3} justifyContent="center" flexWrap="wrap">
        <Box
        //   ref={paletteRef}
        //   id={singlePalette?.id}
        //   key={`palette-${singlePalette?.id}`}
          display="flex"
          flexDirection="column"
          alignContent="center"
          width={400}
          height={400}
          borderRadius={4}
          margin={1}
          // onClick={(e)=>showFullDetailsOfColors(e, unit)}
        >
          {colors?.map((color, colorIndex) => {
            // const hex = rgbaToHex(color);
            return (
              <Box
                className={"nestedDiv"}
                // key={`color-${singlePalette.id}-${colorIndex}`}
                width="100%"
                height={100}
                bgcolor={color}
                display="flex"
                alignItems="flex-end"
                paddingLeft="5px"
                sx={{
                  cursor: "pointer",
                  borderTopLeftRadius: colorIndex === 0 ? 10 : 0,
                  borderTopRightRadius: colorIndex === 0 ? 10 : 0,
                  borderBottomLeftRadius: colorIndex === 4 ? 10 : 0,
                  borderBottomRightRadius: colorIndex === 4 ? 10 : 0,
                  "&:hover .color-value": { opacity: 1 },
                }}
              >
                <TextField type="color" value={pickupColor}  onChange={(e)=>handleColorPicker(e)}/>
                <Typography
                  className="color-value"
                  fontSize="15px"
                  color="white"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.2s ease-in-out",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    marginBottom: "5px",
                  }}
                //   onClick={(e) => handleCopyText(e, hex)}
                >
                  {/* {hex} */}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Grid>
     

    

      {/* <ToastContainer /> */}
    </Box>
  );
}
