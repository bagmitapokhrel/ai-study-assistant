declare module "pdf-parse" {
  interface PDFParseData {
    text: string
    numpages?: number
    numrender?: number
    info?: Record<string, unknown>
    metadata?: Record<string, unknown>
    textAsHtml?: string
    version?: string
  }

  function pdfParse(dataBuffer: Buffer | Uint8Array | ArrayBuffer, options?: any): Promise<PDFParseData>

  export default pdfParse
}
