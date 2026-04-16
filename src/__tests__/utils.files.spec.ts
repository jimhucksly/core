import { files } from "@/utils/files";

describe('Files', () => {
  it('ok', () => {
    const value = 'filename.mixin.docx';
    expect(files.getExtension(value)).toEqual('docx');
    expect(files.getFileName(value)).toEqual('filename.mixin');
    expect(files.formatSize(811497)).toEqual('792.48KB');
  });
});