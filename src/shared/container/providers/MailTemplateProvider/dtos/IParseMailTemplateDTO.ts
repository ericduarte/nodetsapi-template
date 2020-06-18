interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTampleteDTO {
  file: string;
  variables: ITemplateVariables;
}
