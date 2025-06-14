def parse_and_add(data: dict, current: str, key: str) -> None:
    parts = [part.strip() for part in current.split("<sep>") if part.strip()]
    data[key] = parts