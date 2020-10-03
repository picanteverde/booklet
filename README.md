# Booklet

A booklet is a document printed with 4 pages per sheet. In a way that you can fold them to form a book.

For a document with 8 pages you will get:

| Sheet   | Page  | left  | right |
| ------- |:-----:|:-----:|:-----:|
| 1       | front | 8     | 1     |
| 1       | back  | 7     | 2     |
| 2       | front | 6     | 3     |
| 2       | back  | 5     | 4     |

that way when you fold them you can read it as a book.

This tool is a booklet generator, receive a pdf document and generates one pdf for the front pages and another for the back pages with this order

| Front | Back |
| -----:| ----:|
| 8     | 2    |
| 1     | 7    |
| 6     | 4    |
| 3     | 5    |

## How to use

### Install dependencies

```bash
$npm i
```

### Bring your Pdf

Copy your Pdfs documents to the '/input' directory

### Run the command

```bash
$npm start
```

### Print your documents

On the '/output' directory you'll find the the front and back pdf files to print.

Open the front file and config your printer with a layout of two pages per sheet.

Once the front files is printed invert the order of the paper sheets and feed them back to the printer, take into consideration the orientation of the paper.

Open the back file and config your printer with a layout of two pages per sheet.

Happy booklet printing.