export const timeoutSecond = 30000;
export const deviceWidth = require('Dimensions').get('window').width
export const deviceHeight = require('Dimensions').get('window').height
export const HEScolor = '#5CB400'

export const base64Badge = "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"
export const base64Noqnoq = "iVBORw0KGgoAAAANSUhEUgAAACgAAAApCAYAAABHomvIAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAAAKQAAAABkTm0mAAADyklEQVRYCc1YS1LbQBC1VamCXXSDKCdAnADnBPENkDd8VpgbOCcAVnw2NidIcoKYEwROEHEDewcsIO+ppqckuTUzMgFlqsaj6d+86e7pkdXvrdHOz8+TKIp2Xl5ehlCPTU+NqQXGW/ScI2R+Hh4e8nmt1m+jdXFxcQT5DF3AhKoT8GxjY+N6NBpxA8EtCODl5eUuPDGB1STYsi6Y9/v9yf7+/rXOXqU6ATKUMPgdam09trpSlTLHhkchoW8EeHV1lT4/P/+C3bhq+5/NFsjjL3t7ewx/Y4s0DjyXAdxv8N4KHJeNuQbX4qSprXjQeI7g3qs5PVkBaHLurT2nbXyBnNzWcrISYnMg3jKsGjjSYqw91ZgWoMmFVBMKoC3hgRvT7wPkNZGBlo82xCjCf6CVaJoNtCVrGhL9Rz000+k0fnp64kEbQ+ZTg75GzlHMt8vFvACIQjzG7k80DY0G2evNzc1x2ZAmR6APDw+nALmr8TUabLM+zoT3gQ8grm1ADGmj2UCG0M2bcqyuB7kj0GZC75uTy/B6Gz2H3WVeQUUA68xCPYl1Pkva8JAMFHsaacmwaowQGnWxcNABwg0zFJsRdmUnQtRGyE18OafpCY26WPhU5q4RG0mEH2ESy8Q18rS6+CG8UBvAlIo9evCjTBzjUnLCIeNl0UZImIFpS4wxBy1aIdZHGL2t014xzwN0Y5GxN4kQ/reRAJc+UHB5m9vAaa4cPoegxcRDEhK+hLeCw2AQizUXgl47ZUz0YI7ubbxbvUJ+gVAbuZhCaYpCPMjr8Og1XqQuwstrzNvKmKLQ2gSryePj44nXeoOA0fWGl+plTJGpb3cNdutkXvxZneibG51QvbtyzS3eZuD6GUIY5B3ITvHuuIP3tmPf1cewGs+FgusRS3nDxfsgDeG97RbMNuUkh6FTbGzl0wZPK/JoF7wxZILCakAtsfGkvPECIJkMA71jBNsOORTY2VL0NqAKJfNzdnBwwE3ZZgGSApB8sdyx3A4e4PXKG3X9qsuAyVbxDvAxB6f4CzKUtSseJLGDP+6CpTza/8l1D/b4rYRuhnSXnmQOT4h4BSCJqEMznMIBHjsDiVB/xfo6QDLoSYKEN28476AVlUD1oIAhSHiTIDsLuROgAGXIWUAN0NBrUdR70LtHyI5BaKNbyK6cYmvV8WBuiiEWJugUi1dqJ2g3oC3QWVfn8pHSXH1zmN5ymC9YsFHUw7UA+oy7+CEgAc5+IAgKsWvBtjzes0iXAfTOFF1+JfuGlMqE9+4elIU5mpeUFI8Jeg5gc4yV9hdhPrA3EJmcpgAAAABJRU5ErkJggg=="
export const base64QR = "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"