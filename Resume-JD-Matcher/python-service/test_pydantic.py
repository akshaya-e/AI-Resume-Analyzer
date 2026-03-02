from pydantic.v1 import BaseModel, Field
from typing import Optional, Any

print("Defining Model...")
try:
    class TestModel(BaseModel):
        REGEX: Optional[str] = None
    print("Model defined successfully.")
    m = TestModel(REGEX="foo")
    print(m)
except Exception as e:
    print(f"Failed: {e}")
