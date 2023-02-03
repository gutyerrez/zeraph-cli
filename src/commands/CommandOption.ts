export class CommandOption {
  public name!: string
  public aliases!: string[]
  public description!: string

  constructor(
    name: string,
    aliases: string[],
    description: string
  ) {
    this.name = name
    this.aliases = aliases
    this.description = description
  }
}