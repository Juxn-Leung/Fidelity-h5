export interface FileUploadOptions {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
}

type FileResult<T extends boolean> = T extends true ? File[] : File;

const createFileInput = (options: FileUploadOptions) => {
  const input = document.createElement("input");
  input.type = "file";
  input.style.display = "none";
  input.multiple = !!options.multiple;
  input.accept = options.accept || "";
  return input;
};

const validateFile = (file: File, options: FileUploadOptions): void => {
  const { maxSize, accept } = options;
  const errors: string[] = [];

  if (accept) {
    const acceptPattern = new RegExp(
      accept
        .split(",")
        .map((type) => type.trim().replace(/^\*/, ".*").replace(/^\./, ".*\\."))
        .join("|")
    );

    if (!acceptPattern.test(file.type) && !acceptPattern.test(file.name)) {
      errors.push('不支持此文件格式');
    }
  }

  if (maxSize && file.size > maxSize * 1024) {
    errors.push(`文件大小不能超过 ${maxSize} KB`);
  }

  if (errors.length > 0) {
    throw new Error(errors.join(";"));
  }
};

export function useFileUpload() {
  const openFileDialog = async <T extends boolean = false>(
    options: FileUploadOptions & { multiple?: T }
  ): Promise<FileResult<T>> => {
    return new Promise((resolve, reject) => {
      const input = createFileInput(options);
      document.body.appendChild(input);

      input.click();

      const handleChange = async () => {
        try {
          const files = input.files ? Array.from(input.files) : [];

          if (files.length === 0) {
            throw new Error("未选择文件");
          }

          files.forEach((file) => validateFile(file, options));

          const result = options.multiple ? files : files[0];
          resolve(result as FileResult<T>);
        } catch (error) {
          // console.error("File validation error:", error);
          reject(error);
        } finally {
          document.body.removeChild(input);
        }
      };

      input.addEventListener("change", handleChange, { once: true });
    });
  };

  return { openFileDialog };
}
